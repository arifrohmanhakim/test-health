import { useCallback, useState, useRef } from "react";
import _ from 'lodash';
import { Button, Input, message, Space } from 'antd';
import axios from "axios";
import { Link, history } from 'umi';
import { useAPI } from '../../utils/helpers';
import cookie from 'js-cookie';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSignIn = useCallback(() => {
        if (_.eq(email, '')) {
            alert('Email Required!');
            if (!_.isNil(emailRef)) emailRef?.current?.focus();
            return;
        }
        if (_.eq(password, '')) {
            alert('Password Required!');
            if (!_.isNil(passwordRef)) passwordRef?.current?.focus();
            return;
        }
        const params = {
            u_email: email,
            u_password: password,
            u_type: 'native'
        };
        axios.post(
            `${useAPI('/login')}`,
            params,
            {
                timeout: _.toNumber(TIMEOUT),
            },
        ).then(res => {
            if (_.eq(res?.data?.status, 'error')) {
                message.error(res?.data?.message)
                return;
            }
            cookie.set('user', JSON.stringify(_.first(res?.data?.data || [])));
            history.push('/business')
            console.log("Trd", res)
        }).catch(err => {
            message.error(err?.message)
            console.log("err: onSignIn", err)
        });
    }, [email, password]);

    return (
        <div>
            <h2>Sign In</h2>
            <Space size="middle" direction="vertical">
                <Space direction="vertical">
                    <Input ref={emailRef} placeholder="email" type="email" value={email} onChange={e => setEmail(e?.target?.value)} />
                    <Input ref={passwordRef} placeholder="password" type="password" value={password} onChange={e => setPassword(e?.target?.value)} />
                </Space>
                <Button onClick={onSignIn} type="primary">Sign In</Button>
                <Link to="/sign-up">Belum Punya Akun? Daftar Sekarang</Link>
            </Space>
        </div>
    );
}
