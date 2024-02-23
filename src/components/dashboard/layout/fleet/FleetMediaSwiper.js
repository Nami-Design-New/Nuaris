import { Carousel } from "react-bootstrap";
import fleet from "../../../../assets/images/fleet.png";
import Badge from "../../../ui/Badge";

export default function FleetMediaSwiper({ media }) {
  // TODO: loop over images and videos
  const carouselContent = (
    <>
      {media &&
        media?.map((item, i) => {
          return (
            <Carousel.Item>
              {item.type === "img" ? (
                <>
                  <img
                    loading="lazy"
                    draggable={false}
                    src={item?.src}
                    alt={item?.alt || "Fleet"}
                  />
                </>
              ) : (
                <>
                  <video
                    loop={true}
                    controls={false}
                    draggable={false}
                    src={item?.src}
                    autoPlay={true}
                  />
                </>
              )}
            </Carousel.Item>
          );
        })}
    </>
  );

  return (
    <article className="fleet-media-swiper">
      <Badge state={1} content={"available"} />
      <Carousel fade controls={false}>
        {/* {carouselContent} */}
        {/* TODO: Remove below content */}
        <Carousel.Item>
          <img loading="lazy" draggable={false} src={fleet} alt="fleet" />
        </Carousel.Item>
        <Carousel.Item>
          <img loading="lazy" draggable={false} src={fleet} alt="fleet" />
        </Carousel.Item>
        {/* TODO: Remove above content */}
      </Carousel>
    </article>
  );
}
