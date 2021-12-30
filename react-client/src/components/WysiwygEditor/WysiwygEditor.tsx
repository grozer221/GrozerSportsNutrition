import React, {FC} from 'react';
import {Editor} from '@tinymce/tinymce-react';

type Props = {
    text: string,
    setText: (text: string) => void,
}

export const WysiwygEditor: FC<Props> = ({text, setText}) => {
    return (
        <Editor
            init={{
                height: '60vh',

            }}
            value={text}
            onEditorChange={setText}
            apiKey={'pn18e5vacaao1r9yihq8aq4c0gcomzoplpgle7xaza9d8e04'}
        />
    );
};
