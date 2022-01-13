import React, {FC} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Avatar, Card, Carousel, message, Table, Tag} from 'antd';
import s from './ProductsView.module.css';
import parse from 'html-react-parser';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {actions} from '../../../redux/basket-reducer';
import {useDispatch} from 'react-redux';

export const ProductsView: FC = () => {
    const params = useParams();
    const productSlug = params.slug || '';
    const getProductQuery = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {
            variables: {slug: productSlug},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const dispatch = useDispatch();

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

    const addToBasketHandler = () => {
        if (getProductQuery.data?.getProduct) {
            dispatch(actions.addProductToBasket(getProductQuery.data.getProduct));
            message.success(`Product ${getProductQuery.data.getProduct.name} was added to basket`);
        }

    };

    if (!productSlug || getProductQuery.error)
        return <Error/>;

    if (getProductQuery.loading)
        return <Loading/>;

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
                    <header>{product?.name}</header>
                    <table className="infoTable">
                        <tbody>
                        <tr>
                            <td>Id:</td>
                            <td>
                                <span># {product?.id}</span>
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
                    <div className={s.priceAndAddToBasket}>
                        <div className={s.price}>{product?.priceUAH} UAH</div>
                        <button onClick={addToBasketHandler} className="buttonSubmit">
                            <ShoppingCartOutlined/>
                        </button>
                    </div>
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
