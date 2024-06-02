'use client'

import {Content} from '@prismicio/client';
import {SliceComponentProps} from '@prismicio/react';
import React, {useEffect, useRef} from 'react';
import {MdCircle} from "react-icons/md";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import Heading from "@/components/Heading";
import {Bounded} from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */


const TechList = ({slice}: TechListProps): JSX.Element => {

    const component = useRef(null)

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    // markers: true,
                    trigger: component.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 4,
                }
            })

            tl.fromTo('.tech-row', {
                x: (index) => (
                    index % 2 === 0
                        ? gsap.utils.random(400, 600)
                        : gsap.utils.random(-400, -600)
                )
            }, {
                x: (index) => (
                    index % 2 === 0
                        ? gsap.utils.random(-400, -600)
                        : gsap.utils.random(400, 600)
                ),
                ease: 'power1.inOut',
            })


        }, component);

        return () => ctx.revert()
    }, []);
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className='overflow-hidden'
            ref={component}
        >
            <Bounded as="div">
                <Heading size="lg" as="h2" className="mb-8">
                    {slice.primary.heading}
                </Heading>
            </Bounded>
            {slice.items.map(({tech_color, tech_name}, index) => (
                <div
                    key={index}
                    className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-500"
                    aria-label={tech_name || ''}>
                    {Array.from({length: 15}, (_, index) => (
                        <React.Fragment key={index}>
                            <span className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                                  style={{color: index === 7 && tech_color ? tech_color : 'inherit'}}>
                                {tech_name}
                            </span>
                            <span className="text-3xl">
                                 <MdCircle/>
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default TechList;
