import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
    return (
        <div className={"w-full h-full relative"}>
            <Card className="w-1/2 absolute top-1/6 left-1/2 -translate-x-1/2">
                <CardHeader>
                    <CardTitle>
                        Create your account
                    </CardTitle>

                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Full Name</FieldLabel>
                                <Input id="username" type="input" placeholder="Jane Doe" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="input" placeholder="m@example.com" />
                            </Field>
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="pw1">Password</FieldLabel>
                                    <Input id="pw1" type="password" />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="pw2">Confirm Password</FieldLabel>
                                    <Input id="pw2" type="password" />
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button>Create Account</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="#">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                    </form>
                </CardContent>
            </Card >
        </div >
    )
}