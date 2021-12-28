import React, {FC} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../GraphQL/products-query';
import {Loading} from '../../../components/Loading/Loading';
import {Avatar, Card, Carousel, Table, Tag} from 'antd';
import s from './ProductView.module.css';

export const ProductView: FC = () => {
    const params = useParams();

    const getProductQuery = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {id: params.id ? parseInt(params.id) : 0}},
    );

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (getProductQuery.loading)
        return <Loading/>;

    if (getProductQuery.error)
        console.log(getProductQuery.error);

    const product = getProductQuery.data?.getProduct;
    console.log(product);
    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
        },
        {
            dataIndex: 'value',
            key: 'value',
        },
    ];
    return (
        <>
            <div className={s.photosAndMainInfo}>
                <Carousel autoplay className={s.carousel}>
                    {product?.files.map(file => (
                        <Avatar className={s.image} shape={'square'} src={file.fileImage} size={256}/>
                    ))}
                </Carousel>
                <div>
                    <header>{product?.name}</header>
                    <table className={s.mainInfo}>
                        <tr>
                            <td>Id:</td>
                            <td>
                                <span># {product?.id}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Is shown:</td>
                            <td>
                                {product?.isShown
                                    ? <Tag color="green">Yes</Tag>
                                    : <Tag color="red">No</Tag>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>
                                <span>{product?.priceUAH}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity:</td>
                            <td>
                                <span>{product?.quantity}</span>
                            </td>
                        </tr>
                        {(product && product?.categories.length > 0) && (
                            <tr>
                                <td>Categories:</td>
                                <td>{product?.categories.map(category => (
                                    <Link to={'../../categories/' + category.slug}>{category.name} </Link>))}</td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
            <div className={s.cards}>
                <Card title="Description" className={s.card}>{product?.description}</Card>
                <Card title="Characteristics" className={s.card}>
                    <Table showHeader={false} dataSource={product?.characteristics}
                           columns={columns} pagination={false}/>
                </Card>
            </div>
        </>
    );
};
