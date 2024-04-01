import { db, eq, desc, ExamTable, TakenExam } from "astro:db";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
    const answers = Array.from(formData.entries());
    
    const user = context.locals.user;
    if (!user) {
        return new Response("A user must be logged in", {
            status: 400
        });
    } 

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


    const takenExam = (await db.select().from(TakenExam).orderBy(desc(TakenExam.id)))[0]

    return context.redirect("/review-exam?id="+takenExam.id)
}
