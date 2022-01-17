import React, {useState} from 'react';
import s from './MyMenu.module.css';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_CATEGORIES_QUERY, GetCategoriesData, GetCategoriesVars} from '../../gql/categories-query';
import Search from 'antd/es/input/Search';
import {AutoComplete} from 'antd';

export const MyMenu = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const getCategoriesQuery = useQuery<GetCategoriesData, GetCategoriesVars>(GET_CATEGORIES_QUERY,
        {
            variables: {
                getCategoriesInput: {
                    take: pageTake,
                    skip: pageSkip,
                    likeName: '',
                },
            },
            context: {gqlLink: gqlLinks.customer},
        },
    );

    const [searchedOptions, setSearchedOptions] = useState<{ value: string }[]>([{value: '11'}]);

    const searchHandler = (value: string) => {
        console.log(value);
    };

    const selectHandler = (value: string, options: any) => {
        console.log(value);
    };

    return (
        <div className={s.wrapperMenu}>
            <div className={s.menu}>
                <Link to={'/'} className={s.menuItem}>Home</Link>
                <Link to={'/products'} className={s.menuItem}>Products</Link>
                <div className={s.dropdown}>
                    <button className={[s.menuItem, s.dropdownButton].join(' ')}>Categories</button>
                    <div className={s.dropdownContent}>
                        {getCategoriesQuery.data?.getCategories.categories.map(category => (
                            <Link to={`/categories/${category.slug}`} key={category.id}>{category.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={s.searchWrapper}>
                <AutoComplete
                    options={searchedOptions}
                    onSearch={searchHandler}
                    onSelect={selectHandler}
                    style={{width: '100%'}}
                >
                    <Search placeholder="Search"/>
                </AutoComplete>
            </div>
        </div>
    );
};
