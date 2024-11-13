import { HeroVideoDialog } from "./dependencyComponent/hero-video-dialog";


export function HeroVideoDialogBox() {
  return (
    <div className="relative w-[70%] px-auto mx-auto">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/AW8WMh3S7G4"
        thumbnailSrc="https://res.cloudinary.com/dncm3mid4/image/upload/v1731522042/githubreadme/fae5stjqrabjlkn6gooq.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/AW8WMh3S7G4"
        thumbnailSrc="https://res.cloudinary.com/dncm3mid4/image/upload/v1731522042/githubreadme/fae5stjqrabjlkn6gooq.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
