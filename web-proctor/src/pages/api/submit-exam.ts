import { db, eq, ExamTable, TakenExam } from "astro:db";
import type { APIContext } from "astro";
import { number } from "astro/zod";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
    const answers = Array.from(formData.entries());
    
    const user = context.locals.user;
    if (!user) {
        return new Response("A user must be logged in", {
            status: 400
        });
    } 

    //some typescript bs
    const formDataEntryValue = formData.get("examId");
    // Check if the value is not null and is a string before converting to a number
    const examId = (typeof formDataEntryValue === 'string' && formDataEntryValue !== '')
        ? Number(formDataEntryValue): 0;

    const exam = (await db.select().from(ExamTable).where(eq(ExamTable.id, examId)))[0];

    await db.insert(TakenExam).values({ 
        byUser: user.username, 
        name: exam.name,
        questions: exam.questions,
        userAnswers: answers.slice(1),
    });




    // Redirect the user to a results page or return a response
    return context.redirect("/review-exam")
}
