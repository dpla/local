import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import scss from "./HomePageSlider.module.scss";

const moreLinkChevron = "static/images/chevron-thick-orange.svg";
const moreLinkChevronBlue = "static/images/chevron-thick-blue.svg";
const largeChevron = "static/images/chevron-thin.svg";

const HomePageSlider = ({
  browseLinkName,
  browseLinkUrl,
  items,
  slidesToShow,
  title,
  theme
}) =>
  <div className={`${scss.wrapper} ${theme === "blue" ? scss.theme_blue : ""} `}>
    <div className={`${scss.content} site-max-width`}>
      <div className={scss.heading}>
        <h2 className={scss.title}>{title}</h2>
        <Link prefetch href={browseLinkUrl}>
          <a className={`hover-underline ${scss.moreLink}`}>
            Browse all{" "}
            <span className={scss.moreLinkNoun}>{browseLinkName}</span>
            <img
              alt="Browse exhibitions"
              aria-hidden="true"
              className={scss.moreLinkChevron}
              src={moreLinkChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={slidesToShow ? slidesToShow : 2.5}
        infinite={false}
        nextArrow={<NextArrow className={`${scss.arrow} ${scss.nextArrow}`} />}
        prevArrow={<PrevArrow className={`${scss.arrow} ${scss.prevArrow}`} />}
        draggable={false}
        slidesToScroll={slidesToShow ? Math.floor(slidesToShow) : 2}
        responsive={[
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1.125,
              arrows: false,
              draggable: true,
              slidesToScroll: 1
            }
          }
        ]}
      >
        {items.map(
          ({ name, repImageUrl, thumbnailUrl, isFeatured, href, as }, index) =>
            <div key={`${name}—${index}`}>
              <Link prefetch href={href} as={as}>
                <a className={scss.item}>
                  <div className={scss.itemImgWrapper}>
                    <div
                      className={scss.itemImg}
                      style={{
                        backgroundImage: `url(${repImageUrl || thumbnailUrl})`
                      }}
                    />
                  </div>
                  <ReactMarkdown
                    className={scss.itemText}
                    source={name}
                    allowedTypes={["emphasis", "text"]}
                    unwrapDisallowed
                  />
                </a>
              </Link>
            </div>
        )}
      </Slider>
    </div>
  </div>;

export default HomePageSlider;
