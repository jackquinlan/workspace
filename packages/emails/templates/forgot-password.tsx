import { Body, Container, Html, Head, Preview, Tailwind, Section, Hr, Text, Link } from "@react-email/components";

const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`;

interface Props {
    resetLink: string;
}

export function ForgotPasswordTemplate({ resetLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>We have recieved a request to reset your password for your Workspace account</Preview>
            <Tailwind>
                <Body style={main}>
                    <Container className="bg-white my-0 mx-auto pt-[20px] pr-0 pb-[48px] mb-[64px]">
                        <Section className="py-0 px-[48px]">
                            <Text className="text-black text-[18px] font-bold">Workspace</Text>
                            <Hr className="border border-[#e6ebf1] my-[20px] mx-0" />
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                We have recieved a request to reset your password for your Workspace account.
                            </Text>
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                If it was you, you can reset your password by clicking the button below 👇.
                            </Text>
                            <Link className="bg-[#ef4444] rounded-[5px] text-white text-[16px] font-medium block text-center w-100 p-[10px]" href={resetLink}>
                                Reset your password
                            </Link>
                            <Hr className="border border-[#e6ebf1] my-[20px] mx-0" />
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                If this wasn't you, please ignore this email or reach out to{" "}
                                <Link className="text-[#ef4444]" href={url}>
                                support
                                </Link>{" "}
                                for more assistance.
                            </Text>
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                To keep your account secure, please don't forward this email to anyone.
                            </Text>
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                Thank you for using Workspace!
                            </Text>
                            <Text className="text-[#525f7f] text-[16px] leading-[24px] text-left">
                                — The Workspace Team
                            </Text>
                            <Hr className="border border-[#e6ebf1] my-[20px] mx-0" />
                            <Text className="text-[#8898aa] text-[12px] leading-[16px]">
                                Workspace is an open-source platform for helping people orangize their work.
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
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};