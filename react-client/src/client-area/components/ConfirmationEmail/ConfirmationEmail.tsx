import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {useMutation} from '@apollo/client';
import {
    CONFIRMATION_EMAIL_MUTATION,
    ConfirmationEmailData,
    ConfirmationEmailVars,
} from '../../../common-area/gql/auth-mutation';
import {useDispatch} from 'react-redux';
import {login} from '../../../redux/auth-reducer';
import {message} from 'antd';
import {gqlLinks} from '../../../common-area/gql/client';

export const ConfirmationEmail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = params.token || '';
    const [confirmationEmailMutation] = useMutation<ConfirmationEmailData, ConfirmationEmailVars>(CONFIRMATION_EMAIL_MUTATION);
    useEffect(() => {
        confirmationEmailMutation({
            variables: {token: token},
            context: {gqlLink: gqlLinks.customer},
        })
            .then(response => {
                if (response.data) {
                    dispatch(login(response.data.confirmationEmail));
                    message.success('You account successfully has been confirmed');
                    navigate('/');
                }
            })
            .catch(error => {
                message.error(error.message);
                navigate('/');
            });
    }, []);
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Loading/>
        </div>
    );
};
