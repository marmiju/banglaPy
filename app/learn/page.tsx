"use client"
import React, { useState } from "react"
import LWV from "../components/lwv/LWV"
import { resources } from "@/public/data/teching"
import Link from "next/link"

const Page = () => {

  return (
    <div className="">
      {
        resources.map(res => {
          return <section id={res.topic} key={res.topic} className=" p-4">
            <LWV
              explaination={res.desc}
              source={res.source}
              code={res.code}
              quiz={res.quiz!}
            />
          </section >
        })
      }
    </div>
  )
}

export default Page

