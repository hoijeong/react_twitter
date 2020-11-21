import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import {v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        if (tweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
            }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        } 
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target:{ value },
        } = event;
        setTweet(value);
    };

    //event안에서 target안으로 가서 파일을 받아오는 것을 의미
    const onFileChange = (event) => {
        const {
            target:{ files },
         } = event;
         //파일을 갖고 리더를 만든 다음readasdataurl을 사용해서 파일을 읽음
         const theFile = files[0];
         const reader = new FileReader();
         //reader에 event listener을 추가.
         //그리고 파일 로딩이 끝나거나 읽는 것이 끝나면 finishedEvent를 갖게됨 그 다음 reader.readAsDataUrl 실행
         reader.onloadend = (finishedEvent) => {
             //onloadend에 finishedEvent의 result를 setAttacthment로 설정
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
         };
         reader.readAsDataURL(theFile);
    };
    // 사진 등록 취소시 setAttachment를 아무것도 없게.
    const onClearAttachment = () => setAttachment("");
    return (
    <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
            <input
            className="factoryInput__input"
            value={tweet} 
            onChange={onChange} 
            type="text" 
            placeholder="What's on Your Mind?"
            maxLength={120} />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
                opacity: 0,
            }}
        />
            { attachment && (
            <div className="factoryForm__attachment">
                <img
                src={attachment}
                style={{
                    backgroundImage: attachment,
                }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        )}
    </form>
    )
}

export default TweetFactory;