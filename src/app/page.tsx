import Button from "@/component/atoms_/Button";
import Text from "@/component/atoms_/Text";
import Image from "next/image";
import Link from "next/link";
import Logo from "./../component/atoms_/img/balancegame.png";

export default function Home() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-15 px-4">
            <Image
                src={Logo}
                alt="balancegame"
                width={250}
                height={250}
                className="w-[250px] sm:w-[300px] md:w-[400px] drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
                priority
            />

            <div className="text-center space-y-1">
                <Text bold type="large">
                    딱 하나만 고른다면?
                </Text>
                <Text bold type="large">
                    극한의 선택, 당신이라면 어느 쪽?
                </Text>
            </div>

            <Link href={"/main"}>
                <Button buttonType="confirm">
                    <Text bold type="large">
                        START
                    </Text>
                </Button>
            </Link>
        </section>
    );
}
