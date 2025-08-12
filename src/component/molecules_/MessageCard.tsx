import React from "react";
import Text from "../atoms_/Text";

type Props = {
    title: string;
    description?: string;
};

function MessageCard({ title, description }: Props) {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
            <Text bold type="title">
                {title}
            </Text>
            <div className="space-y-2">
                {description?.split("\n").map((line, idx) => (
                    <Text key={idx} type="medium">
                        {line}
                    </Text>
                ))}
            </div>
        </section>
    );
}

export default React.memo(MessageCard);
