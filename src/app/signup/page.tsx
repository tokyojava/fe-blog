import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
    return (
        <div className="bg-muted mt-4 max-w-2/3 flex justify-center m-auto align-center w-full">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Create your account
                    </CardTitle>

                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>

                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}