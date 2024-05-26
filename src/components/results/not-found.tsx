import { Card, CardContent } from "../ui/card"
import Lottie from "lottie-react"
import animation from "@/animation.json"

export const NoResultFound = () => {

    return <Card className="flex items-center justify-center h-[300px] rounded-lg">
        <CardContent className="space-y-2">
            {/* <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
            <iframe src="https://lottie.host/embed/947f9516-b5f0-4d1f-8858-ce821153cd6d/ice7gno7zy.json"></iframe> */}
            <Lottie
                animationData={animation}
                className="flex items-center justify-center"
                loop={true}
            />
           <p className="text-xl font-semibold">No Reviews Found</p>
        </CardContent>
    </Card>
}