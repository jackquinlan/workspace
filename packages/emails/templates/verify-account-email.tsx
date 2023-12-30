import * as React from "react";

import {
    Body,
    Button,
    Container,
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
            <Preview>Workspace - Verify your email</Preview>
            <Tailwind>
                <Body className="bg-[#f4f4f5] px-0 py-[10px]">
                    <Container className="bg-[#ffffff] p-[25px] text-center">
                        <Text className="text-[24px] font-semibold text-black">
                            Welcome to Workspace!
                        </Text>
                        <Section>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                Before you get started, please verify your email address by clicking
                                the button below.
                            </Text>
                            <Button
                                className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-center text-sm font-medium text-white no-underline"
                                href={verifyLink}
                            >
                                Verify your email
                            </Button>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                This token is only valid for the next 2 hours.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
