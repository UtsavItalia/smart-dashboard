from openai import OpenAI
import os
# from dotenv import load_dotenv

def generate_insights(filename: str, stats: dict, correlation: dict) -> str:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    stats_text = ""
    corr_text = ""

    for col, values in stats.items():
        stats_text += f"\n{col}: mean={values['mean']}, std={values['std']}, min={values['min']}, max={values['max']}"

    for col1, row in correlation.items():
        for col2, value in row.items():
            if col1 < col2 and value is not None:
                corr_text += f"\n{col1} vs {col2}: {round(value, 3)}"

        prompt = f"""
            You are a data analyst. Analyze this dataset called "{filename}" and provide clear, concise insights.

            SUMMARY STATISTICS:
            {stats_text}

            CORRELATION MATRIX:
            {corr_text}

            Please provide:
            1. Key observations about the data distributions
            2. Notable correlations and what they might mean
            3. Any anomalies or interesting patterns
            4. 2-3 actionable recommendations based on the data

            Keep your response clear and non-technical enough for a business audience.
            """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
            {"role": "system", "content": "You are a helpful data analyst who explains data clearly."},
            {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=600
        )

        content = response.choices[0].message.content
        return content if content is not None else "No insights could be generated."

