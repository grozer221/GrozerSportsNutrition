import React, {FC, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {Form, Input, Popconfirm, Table} from 'antd';
import {FormInstance} from 'antd/lib/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type Item = {
    id: number,
    name: string,
    age: string,
    address: string,
}

type EditableRowProps = {
    index: number,
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

type EditableCellProps = {
    title: ReactNode,
    editable: boolean,
    children: ReactNode,
    dataIndex: keyof Item,
    record: Item,
    handleSave: (record: Item) => void,
}

const EditableCell: FC<EditableCellProps> = ({
                                                 title,
                                                 editable,
                                                 children,
                                                 dataIndex,
                                                 record,
                                                 handleSave,
                                                 ...restProps
                                             }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export const EditableTable: FC = () => {
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: any) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            id: 2,
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ]);
    const handleDelete = (id: React.Key) => {

    };

    const handleSave = (row: Item) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        console.log(newData);
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columnsObj = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });
    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                dataSource={dataSource}
                columns={columnsObj}
                rowKey={'id'}
            />
        </div>
    );
};
