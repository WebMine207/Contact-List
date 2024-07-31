import React from "react";
import Header from "./Header";
import Content from "./Content";

export default function Page() {
  return (
    <>
      <section className="page">
        <hr />
        <Header />
        <Content />
      </section>
    </>
  );
}
