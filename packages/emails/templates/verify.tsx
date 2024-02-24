import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface Props {
    verifyLink: string;
}

export function VerifyEmailTemplate({ verifyLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to Workspace! Please verify your email.</Preview>
            <Tailwind>
                <Body style={main}>
                    <Container className="mx-auto my-0 mb-[64px] bg-white pb-[48px] pr-0 pt-[20px]">
                        <Section className="px-[48px] py-0">
                            <Text className="text-[18px] font-bold text-black">Workspace</Text>
                            <Hr className="mx-0 my-[20px] border border-[#e6ebf1]" />
                            <Text className="text-left text-[16px] leading-[24px] text-[#525f7f]">
                                Welcome to Workspace! Thank you so much for joining us!
                            </Text>
                            <Text className="text-left text-[16px] leading-[24px] text-[#525f7f]">
                                Before you get started, please verify your email address by clicking
                                the button below 👇.
                            </Text>
                            <Link
                                className="w-100 block rounded-[5px] bg-[#ef4444] p-[10px] text-center text-[16px] font-medium text-white"
                                href={verifyLink}
                            >
                                Verify your email
                            </Link>
                            <Hr className="mx-0 my-[20px] border border-[#e6ebf1]" />
                            <Text className="text-left text-[16px] leading-[24px] text-[#525f7f]">
                                This token is only valid for the next 2 hours.
                            </Text>
                            <Text className="text-left text-[16px] leading-[24px] text-[#525f7f]">
                                To keep your account secure, please don't forward this email to
                                anyone.
                            </Text>
                            <Text className="text-left text-[16px] leading-[24px] text-[#525f7f]">
                                — The Workspace Team
                            </Text>
                            <Hr className="mx-0 my-[20px] border border-[#e6ebf1]" />
                            <Text className="text-[12px] leading-[16px] text-[#8898aa]">
                                Workspace is an open-source platform for helping people orangize
                                their work.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
