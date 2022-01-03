import React, {FC} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../GraphQL/products-query';
import {Loading} from '../../../components/Loading/Loading';
import {Avatar, Card, Carousel, Table, Tag} from 'antd';
import s from './ProductsView.module.css';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {REMOVE_PRODUCT_MUTATION, RemoveProductData, RemoveProductVars} from '../../GraphQL/products-mutation';
import parse from 'html-react-parser';

export const ProductsView: FC = () => {
    const params = useParams();
    const productSlug = params.slug || ''
    const getProductQuery = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {slug: productSlug}},
    );
    const [removeProduct, removeProductOptions] = useMutation<RemoveProductData, RemoveProductVars>(REMOVE_PRODUCT_MUTATION);
    const navigate = useNavigate();

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

    const onRemove = async (slug: string) => {
        const response = await removeProduct({variables: {slug: slug}});
        if (response.data)
            navigate(`../`);
        else
            console.log(response.errors);
    };

    if (!productSlug)
        return <Navigate to={'../../error'}/>;

    if (getProductQuery.loading)
        return <Loading/>;

    if (getProductQuery.error)
        console.log(getProductQuery.error);

    const product = getProductQuery.data?.getProduct;
    return (
        <>
            <div className={s.photosAndMainInfo}>
                <Carousel autoplay className={s.carousel}>
                    {product?.files.map(file => (
                        <Avatar key={file.id} className={s.image} shape={'square'} src={file.fileImage} size={256}/>
                    ))}
                </Carousel>
                <div>
                    <ButtonsVUR updateUrl={`../update/${productSlug}`} onRemove={() => onRemove(productSlug)}/>
                    <header>{product?.name}</header>
                    <table className={s.info}>
                        <tbody>
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
                                    <Tag color={'cyan'}>
                                        <Link key={category.id}
                                              to={'../../categories/' + category.slug}>{category.name}</Link>
                                    </Tag>
                                ))}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={s.cards}>
                <Card title="Description" className={s.card}>{product && parse(product?.description)}</Card>
                <Card title="Characteristics" className={s.card}>
                    <Table showHeader={false} dataSource={product?.characteristics}
                           columns={columns} pagination={false}/>
                </Card>
            </div>
        </>
    );
};
