import {
    Body,
    Link,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface Props {
    verifyLink: string;
}

export function VerifyAccountEmail({ verifyLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email</Preview>
            <Tailwind>
                <Body>
                    <Text>Hello, </Text>
                    <Section>
                        <Text>Welcome to Workspace!</Text>
                        <Text>
                            Before you get started, please verify your email address by clicking
                            the link below.
                        </Text>
                        <Link
                            className="text-blue-500 text-sm font-medium underlined"
                            href={verifyLink}
                        >
                            Verify your email
                        </Link>
                        <Text>
                            This token is only valid for the next 2 hours.
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
