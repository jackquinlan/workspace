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
    resetLink: string;
    name: string;
}

export function ResetPasswordEmail({ name, resetLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Workspace - Reset your password</Preview>
            <Tailwind>
                <Body className="bg-[#f4f4f5] px-0 py-[10px]">
                    <Container className="bg-[#ffffff] p-[25px] text-center">
                        <Text className="text-[24px] font-semibold text-black">
                            Reset your password
                        </Text>
                        <Section>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                You recently requested to reset your password for your Blueprint
                                account. Click the button below to reset it.
                            </Text>
                            <Button
                                className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-center text-sm font-medium text-white no-underline"
                                href={resetLink}
                            >
                                Reset password
                            </Button>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                If you did not request a password reset, please ignore this email or
                                reach out to support.
                            </Text>
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
