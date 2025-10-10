import * as z from "zod";
const t = z.object({
    a: z.string().min(10, {
        error: (iss) => {
            console.log(iss);
            return iss.input.length <= 5 ? "too short" : "too long";
        }
    }),
    b: z.number(),
});

console.log(t.parse({
    a: "1111111",
}))