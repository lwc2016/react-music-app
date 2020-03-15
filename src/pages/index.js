import React, { Component } from 'react';
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import MusicItem from "../components/musicItem";
import styles from './index.less';

const Index = (props) => {
  const { list = [] } = props;
  return (
    <div>
        {list.map(item => <MusicItem key={item.id} {...item} />)}
    </div>
  )
}

export default inject(store => store.music)(observer(Index))