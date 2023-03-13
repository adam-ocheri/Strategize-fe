import React from 'react'

export default function MultiLinkBox_LoginPage({className}:any) {
  return (
    <>
        <section className={className}>
            <div className="centered ">
                <h1 className="font-9 s5 p4 m4 PE-top-border-circles main-title">STRATEGIZE</h1>
            </div>
            <article className="p2 m2">
                <div className="flex f-wrap p1 m1 j-center j-even ">
                    <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
                        <h3 className="font-5 white s3 under-title">Plan</h3>
                        <p className="font-3 white">
                        Struggling to stay on top of your tasks and deadlines? With Strategize, you can plan out your schedule with ease. 
                        Our app offers intuitive calendars and schedulers, enabling you to create detailed task lists and track your progress. 
                        Whether you're a busy professional or a student juggling multiple projects, Strategize helps you stay organized and focused.
                        With Strategize, you may juggle no further.
                        </p>
                        <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
                    </a>
                    <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
                        <h3 className="font-5 s3 under-title white">Create</h3>
                        <p className="font-3 white">
                        One of the key advantages of Strategize is its ability to help you create a clear hierarchy of goals and objectives. 
                        By organizing your tasks in a logical and controlled environment, you can easily prioritize your work and ensure that you're always 
                        working towards your long-term objectives. From personal to professional projects, Strategize helps you create a roadmap for success -
                        driven by meticulous planning and strategy.
                        </p>
                        <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
                    </a>
                    <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
                        <h3 className="font-5 s3 under-title white">Excel</h3>
                        <p className="font-3 white">
                        With Strategize, you can take your productivity to the next level. Our app provides detailed usage history statistics, 
                        presented in visualized data charts that help you track your efficiency over time. By identifying patterns and trends in your work habits, 
                        you can optimize your workflow and maximize your output. Whether you're looking to boost your productivity at work or at home, Strategize has you covered.
                        </p>
                        <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
                    </a>
                </div>
            </article>
        </section>
    </>
  )
}
