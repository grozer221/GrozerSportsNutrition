import React, {FC, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Avatar, Card, Carousel, message, Table, Tag} from 'antd';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../gql/categories-query';
import {Product} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {REMOVE_CATEGORY_MUTATION, RemoveCategoryData, RemoveCategoryVars} from '../../gql/categories-mutation';
import s from './CategoriesView.module.css';
import parse from 'html-react-parser';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';

export const CategoriesView: FC = () => {
        const [pageTake, setPageTake] = useState(10);
        const [pageSkip, setSkipTake] = useState(0);
        const params = useParams();
        const categorySlug = params.slug || '';
        const navigate = useNavigate();
        const [products, setProducts] = useState<Product[]>([]);

        const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
            GET_CATEGORY_QUERY, {
                variables: {slug: categorySlug},
                context: {gqlLink: gqlLinks.admin},
            });
        const [removeCategory, removeCategoryOptions] = useMutation<RemoveCategoryData, RemoveCategoryVars>(REMOVE_CATEGORY_MUTATION,
            {context: {gqlLink: gqlLinks.admin}}
        );

        useEffect(() => {
            if (getCategoryQuery.data?.getCategory)
                setProducts(getCategoryQuery.data?.getCategory.products);
        }, [getCategoryQuery.data?.getCategory]);

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                render: (text: any, product: Product) => <>#{product.id}</>,
            },
            {
                title: 'Image',
                dataIndex: 'fileImage',
                render: (text: any, product: Product) => (
                    <Carousel className={s.carousel}>
                        {product.files.map(file => (
                            <div>
                                <Avatar className={s.image} shape={'square'} size={64} src={file.fileImage}
                                        alt={file.fileName}/>
                            </div>
                        ))}
                    </Carousel>
                ),
            },
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
            },
            {
                title: 'Price',
                dataIndex: 'priceUAH',
            },
            {
                title: 'Actions',
                render: (text: any, product: Product) => (
                    <ButtonsVUR viewUrl={`../../products/${product.slug}`}/>
                ),
            },
        ];

        const onRemove = async (slug: string) => {
            const response = await removeCategory({variables: {slug: slug}});
            if (!response.errors)
                navigate(`../`);
            else {
                response.errors?.forEach(error => message.error(error.message));
            }
        };

        if (!categorySlug || getCategoryQuery.error)
            return <Error/>;

        if (getCategoryQuery.loading)
            return <Loading/>;

        const category = getCategoryQuery.data?.getCategory;
        return (
            <>
                <ButtonsVUR updateUrl={`../update/${categorySlug}`} onRemove={() => onRemove(categorySlug)}/>
                <header>{category?.name}</header>
                <table className='infoTable'>
                    <tbody>
                    <tr>
                        <td>Id:</td>
                        <td>
                            <span># {category?.id}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Is shown:</td>
                        <td>
                            {category?.isShown
                                ? <Tag color="green">Yes</Tag>
                                : <Tag color="red">No</Tag>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Slug:</td>
                        <td>
                            <span>{category?.slug}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Table
                    title={() => <div className={s.productsTitle}>Products</div>}
                    loading={removeCategoryOptions.loading}
                    columns={columns}
                    dataSource={products.map(products => ({key: products.id, ...products}))}
                    pagination={false}
                    // pagination={{
                    //     total: productsObj.total,
                    //     onChange: async (pageNumber: number) => {
                    //         const pageSkip = (pageNumber - 1) * pageTake;
                    //         setSkipTake(pageSkip);
                    //         // await getProductsByCategoryIdQuery.refetch({
                    //         //     getProductsByCategoryIdInput: {
                    //         //         categoryId: categoryId,
                    //         //         skip: pageSkip,
                    //         //         take: pageTake,
                    //         //         likeName: '',
                    //         //     },
                    //         // });
                    //     },
                    // }}
                />
                <Card title="Description" className={s.description}>{category && parse(category?.description)}</Card>
            </>
        );
    }
;
;
