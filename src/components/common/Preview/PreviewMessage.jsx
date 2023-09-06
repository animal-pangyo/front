import React, { useState } from "react";
import styled from "./previewMessage.module.css";

const PreviewMessage = ({latestMessage}) => {

    const messages = ["안녕하세요아ㅣ 지금 은 토요아ㅣㅊㄹ 입니데요", "내일은 잉료아일익이고용","오늘은 맛있느능거 먹으러가아아니"];

    return (
      <div className={styled.previewMsgBox}>
   
          <div className={styled.previewMsg}>
          안녕하세요아ㅣ 지금 은 토요아ㅣㅊㄹ 입니데요
      
          </div>

      </div>
    )
};

export default PreviewMessage;