import {Button, Input, message, Space} from 'antd';
import CCard from "component/CCard";
import Framework from "component/Framework";
import HttpScheme from "constant/HttpScheme";
import React, {useRef, useState} from 'react';
import {copyToClipboard} from "utils/PageUtils";

import ReactUtils from "utils/ReactUtils";

const {TextArea} = Input;

function DownloadProxy() {

    const [value, setValue] = useState('');
    const decodeValue = !value ? '' : decodeURIComponent(value.trim())
    const proxyUrl = !decodeValue ? decodeValue : `/proxy?url=${decodeValue}`

    const aButton = useRef(null);

    const [messageApi, contextHolder] = message.useMessage();

    const copySuccess = () => {
        messageApi.info('复制成功!')
    };

    return (
        <Framework>
            {contextHolder}
            <CCard>

                <a ref={aButton}
                   className={'display-none'}
                   href={!proxyUrl ? '#' : proxyUrl}
                />

                <TextArea
                    className={'textarea'}
                    style={{
                        minWidth: '17rem',
                        width: '30vw',
                        minHeight: '10rem',
                        height: '30vh',
                    }}
                    placeholder='请输入链接'
                    value={decodeValue}
                    onChange={e => setValue(e.target.value)}
                />

                <Space wrap
                       size={'large'}
                       align={'center'}
                       style={{
                           marginTop: '1rem'
                       }}
                >
                    <Button danger
                            onClick={() => setValue('')}
                    >清空</Button>

                    <Button type={'primary'}
                            disabled={!decodeValue}
                            onClick={() => {
                                copyToClipboard(proxyUrl)
                                copySuccess()
                            }}
                    >复制</Button>

                    <Button type={'primary'}
                            disabled={!decodeValue}
                            onClick={() => ReactUtils.doHtmlElement(aButton, e => e.click())}
                    >{urlTypeText(decodeValue)}下载</Button>
                </Space>
            </CCard>
        </Framework>
    );
}

/**
 *
 * @param href {string}
 * @returns {string | null}
 */
function getHttpScheme(href) {

    if (href) {
        const index = href.indexOf(':');
        if (index > 0) {
            const type = href.substring(0, index);
            return HttpScheme[type];
        }
    }

    return null;
}

/**
 *
 * @param href {string}
 * @returns {string}
 */
function urlTypeText(href) {

    const httpScheme = getHttpScheme(href);
    if (!httpScheme) {
        return '';
    }
    return httpScheme + ' ';
}

export default DownloadProxy;
