import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

type Prop = {
  children: string;
};

const NiceMarkdown: FC<Prop> = (props) => {
  const html = md.render(props.children);
  return (
    <div
      className="NiceMarkdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default NiceMarkdown;
