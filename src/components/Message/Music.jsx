import {
  Avatar,
  Card,
  CardBody,
  Image,
  Button,
  Progress,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiRepeatOneFill } from "react-icons/ri";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { BsFillPauseCircleFill,BsFillPlayCircleFill } from "react-icons/bs";
import { PiShuffleAngular } from "react-icons/pi";
import { GlobalContext } from "../../contexts/global";

export default function Music({ data, align }) {
  const [state,dispatch] = useContext(GlobalContext)
  const [liked, setLiked] = useState(false);

  const handlePlay = ()=>{
    dispatch('setCurrentPlayMusicId',data.value.id)
  }

  const handleNext = ()=>{
    const index = state.roomMusicList.findLastIndex(i=>i.id === data.value.id)
    if(index === state.roomMusicList.length - 1) return 
    dispatch('setCurrentPlayMusicId',state.roomMusicList[index+1].id)
  }

  const handlePre = ()=>{
    const index = state.roomMusicList.findLastIndex(i=>i.id === data.value.id)
    if(index === 0) return 
    dispatch('setCurrentPlayMusicId',state.roomMusicList[index-1].id)
  }

  const isPlay = state.currentPlayMusicId = data.value.id

  return (
    <div
      className={`mx-3 mt-2 flex ${
        align === "right" ? "flex-row-reverse" : "flex-row"
      } flex-nowrap gap-2 p-2`}
    >
      <Avatar
        className="flex-none"
        size="lg"
        src={data.avatar}
        name={data.nickname}
      ></Avatar>
      <div className={`flex-1  ${align === "right" && "text-right"}`}>
        <div className="text-gray-600 text-xs pt-2 w-auto">{data.nickname}</div>
        <div className="rounded p-2 text-black mt-2 inline-block min-h-[40px]">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[500px]"
            shadow="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    width={200}
                    shadow="md"
                    src="https://nextui.org/images/album-cover.png"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90">
                        Daily Mix
                      </h3>
                      <p className="text-small text-foreground/80">12 Tracks</p>
                      <h1 className="text-large font-medium mt-2">
                        Frontend Radio
                      </h1>
                    </div>
                    <Button
                      isIconOnly
                      className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                      radius="full"
                      variant="light"
                      onPress={() => setLiked((v) => !v)}
                    >
                        {
                            liked ? <AiOutlineHeart className="text-lg" /> : 
                            <AiFillHeart
                                className="text-lg"
                                fill="currentColor"
                            />
                        }
                    </Button>
                  </div>

                  <div className="flex flex-col mt-3 gap-1">
                    <Progress
                      aria-label="Music progress"
                      classNames={{
                        indicator: "bg-default-800 dark:bg-white",
                        track: "bg-default-500/30",
                      }}
                      color="default"
                      size="sm"
                      value={33}
                    />
                    <div className="flex justify-between">
                      <p className="text-small">1:23</p>
                      <p className="text-small text-foreground/50">4:32</p>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center gap-4">
                    {/* <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <RiRepeatOneFill className="text-xl text-foreground/80" />
                    </Button> */}
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onClick={handlePre}
                    >
                      <ImArrowLeft2 className="text-xl" />
                    </Button>
                    <Button
                      isIconOnly
                      className="w-auto h-auto data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onClick={handlePlay}
                    >
                        {
                            isPlay ? <BsFillPauseCircleFill size={35} /> : <BsFillPlayCircleFill size={35} />
                        }
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onClick={handleNext}
                    >
                      <ImArrowRight2 className="text-xl" />
                    </Button>
                    {/* <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PiShuffleAngular className="text-xl text-foreground/80" />
                    </Button> */}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
