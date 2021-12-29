import React, {FC, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {Loading} from '../../../components/Loading/Loading';
import {Avatar, Card, Carousel, Switch, Table, Tag} from 'antd';
import s from './CategoriesView.module.css';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../GraphQL/categories-query';
import {Product} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {updateFileInput} from '../../GraphQL/files-mutation';
import {UPDATE_PRODUCT_MUTATION, UpdateProductData, UpdateProductVars} from '../../GraphQL/products-mutation';
import {REMOVE_CATEGORY_MUTATION, RemoveCategoryData, RemoveCategoryVars} from '../../GraphQL/categories-mutation';

export const CategoriesView: FC = () => {
        const [pageTake, setPageTake] = useState(10);
        const [pageSkip, setSkipTake] = useState(0);
        const params = useParams();
        const categoryId = params.id ? parseInt(params.id) : 0;
        const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
            GET_CATEGORY_QUERY,
            {variables: {id: categoryId}},
        );

        const [products, setProducts] = useState<Product[]>([]);
        const [updateProduct, updateProductOptions] = useMutation<UpdateProductData, UpdateProductVars>(UPDATE_PRODUCT_MUTATION);
        const [removeCategory, removeCategoryOptions] = useMutation<RemoveCategoryData, RemoveCategoryVars>(REMOVE_CATEGORY_MUTATION);
        const navigate = useNavigate();


        useEffect(() => {
            if (getCategoryQuery.data?.getCategory)
                setProducts(getCategoryQuery.data?.getCategory.products);
        }, [getCategoryQuery.data?.getCategory]);

        const toggleIsShownHandler = async (product: Product, flag: boolean) => {
            product.isShown = flag;
            // @ts-ignore
            const {key, categories, ...rest} = product;
            const files: updateFileInput[] = product.files.map(file => {
                const {fileImage, filePath, ...rest} = file;
                return rest;
            });
            const response = await updateProduct({
                variables: {
                    updateProductInput: {
                        ...rest,
                        files: files,
                    },
                },
            });
            if (!response.errors) {
                const newProducts = products.map(product => (product.id === response.data?.updateProduct.id ? response.data.updateProduct : product));
                setProducts(newProducts);
            } else {
                console.log(response.errors);
            }
        };

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                render: (text: any, product: Product) => <>#{product.id}</>,
            },
            {
                title: 'Is shown',
                dataIndex: 'isShown',
                render: (text: any, product: Product) => (
                    <Switch size={'small'} checked={product.isShown}
                            onChange={(flag) => toggleIsShownHandler(product, flag)}/>
                ),
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
                    <ButtonsVUR viewUrl={`../../products/${product.id}`}/>
                ),
            },
        ];

        const onRemove = async (id: number) => {
            const response = await removeCategory({variables: {id: id}});
            if (!response.errors)
                navigate(`../`);
            else
                console.log(response.errors);
        };

        if (!params.id)
            return <Navigate to={'../../error'}/>;

        if (getCategoryQuery.loading)
            return <Loading/>;

        if (getCategoryQuery.error)
            console.log(getCategoryQuery.error);

        const category = getCategoryQuery.data?.getCategory;
        return (
            <>
                <ButtonsVUR updateUrl={`../update/${categoryId}`} onRemove={() => onRemove(categoryId)}/>
                <header>{category?.name}</header>
                <table className={s.info}>
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
                <Card title="Description" className={s.description}>{category?.description}</Card>
                <Table
                    title={() => <div className={s.productsTitle}>Products</div>}
                    loading={updateProductOptions.loading}
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
            </>
        );
    }
;
;
