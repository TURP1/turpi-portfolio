import {SliceZone} from '@prismicio/react';
import {components} from '@/slices';
import {Bounded} from "@/components/Bounded";
import Heading from "@/components/Heading";
import {isFilled, DateField, Content} from "@prismicio/client";


export const ContentBody = ({page}: { page: Content.BlogPostDocument | Content.ProjectDocument }) => {

    const formatDate = (date: DateField) => {
        if (isFilled.date(date)) {
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }

            return new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date(date))
        }
    }


    return (
        <Bounded as='article'>
            <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
                <Heading as='h1'>{page.data.title}</Heading>
                <div className="flex mt-[20px] gap-4 text-yellow-400 text-xl font-bold">
                    {page.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <p className='mt-8 border-b border-slate-600 text-xl font-medium text-slate-300'>{formatDate(page.data.date)}</p>
                <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
                    <SliceZone slices={page.data.slices} components={components}/>
                </div>
            </div>
        </Bounded>
    );

}

