import React, { useRef, useState, forwardRef } from "react";

import { AppTable } from "@oneui/6d-table";

import CustomTooltipPopover from "@oneui/react-components/src/components/CustomTooltipPopover";
import CustomTooltip from "@oneui/react-components/src/components/CustomTooltip";
import alert from "@oneui/react-components/src/components/AlertModal";

import "@oneui/6d-base-theme/build/theme.css";
import ReactTooltip from "react-tooltip";

let tableResponse = {
  data: [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate …utem quasi\nreiciendis et nam sapiente accusantium",
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem n…iatur\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
      postId: 1,
      id: 3,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\naut …mus et vero voluptates excepturi deleniti ratione",
    },
    {
      postId: 1,
      id: 4,
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque\noccaecati deserunt quas accusantium u…r itaque dolor\net qui rerum deleniti ut occaecati",
    },
    {
      postId: 1,
      id: 5,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex volupta…ugit inventore cupiditate\nvoluptates magni quo et",
    },
    {
      postId: 1,
      id: 6,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate …utem quasi\nreiciendis et nam sapiente accusantium",
    },
    {
      postId: 1,
      id: 7,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem n…iatur\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
      postId: 1,
      id: 8,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\naut …mus et vero voluptates excepturi deleniti ratione",
    },
    {
      postId: 1,
      id: 9,
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque\noccaecati deserunt quas accusantium u…r itaque dolor\net qui rerum deleniti ut occaecati",
    },
    {
      postId: 1,
      id: 10,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex volupta…ugit inventore cupiditate\nvoluptates magni quo et",
    },
    {
      postId: 1,
      id: 11,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate …utem quasi\nreiciendis et nam sapiente accusantium",
    },
    {
      postId: 1,
      id: 12,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem n…iatur\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
      postId: 1,
      id: 13,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\naut …mus et vero voluptates excepturi deleniti ratione",
    },
    {
      postId: 1,
      id: 14,
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque\noccaecati deserunt quas accusantium u…r itaque dolor\net qui rerum deleniti ut occaecati",
    },
    {
      postId: 1,
      id: 15,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex volupta…ugit inventore cupiditate\nvoluptates magni quo et",
    },
  ],
  totalRecords: 500,
  isNextPage: true,
};

const getList = async (pageIndex) => {
  try {
    console.log("Page new index : ", pageIndex);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    tableResponse["pageNumber"] = pageIndex + 1;
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const DemoTable = () => {
  const ref = useRef();

  const [filterFormData, showFilterFormData] = useState(false);
  const [isOpen, setPopoverOpen] = useState(false);

  const FooterComponent = (props) => {
    return (
      <span
        className="hyperlink"
        // style={{ cursor: "pointer", fontWeight: "600" }}
        onClick={(e) => {
          if (typeof navigator.clipboard == "undefined") {
            console.log("navigator.clipboard undefined");
            console.log(props.content);
            let textArea = document.createElement("textarea");
            textArea.value = props.content;
            textArea.style.position = "fixed"; //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            return;
          } else {
            console.log(props.content);
            navigator.clipboard.writeText(props.content);
          }
        }}
      >
        {"Button"}
      </span>
    );
  };

  const columns = [
    {
      Header: "Sl No",
      accessor: "id",
      Cell: (row) => {
        const uniqueId = uuidv4();
        return (
          <React.Fragment>
            <CustomTooltip
              uniqueId={uniqueId}
              position="top"
              effect="solid"
              content={row.value}
            />
          </React.Fragment>
        );
      },
      style: {
        textAlign: "center",
        color: "#1D1D1D",
      },
    },
    {
      Header: "Name",
      accessor: "name",
      sortType: "basic",
      isSortable: true,
      Cell: (row) => {
        const uniqueId = uuidv4();
        return (
          <React.Fragment>
            <CustomTooltip
              uniqueId={uniqueId}
              position="bottom"
              effect="solid"
              content={row.value}
            />
          </React.Fragment>
        );
      },
      style: {
        color: "#1D1D1D",
      },
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (row) => {
        const uniqueId = uuidv4();
        return (
          <React.Fragment>
            <CustomTooltip
              uniqueId={uniqueId}
              position="right"
              effect="float"
              content={row.value}
            />
          </React.Fragment>
        );
      },
      style: {
        color: "#1D1D1D",
      },
    },
    {
      Header: "Comment",
      accessor: "body",
      id: "Comment",
      Cell: (row) => {
        const uniqueId = uuidv4();
        return (
          <React.Fragment>
            <CustomTooltipPopover
              trigger="focus"
              header={row.column.Header}
              content={row.value}
              uniqueId={uniqueId}
              footer={<FooterComponent content={row.value} />}
            />
          </React.Fragment>
        );
      },
      style: {
        width: "150px",
        color: "#1D1D1D",
      },
    },
    {
      Header: "Editable Column",
      accessor: "editable",
      id: "Editable Column",
      Cell: (row) => {
        return (
          <React.Fragment>
            <div
              onClick={() => {
                alert("clicked select button");
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Select</p>
              <svg
                id="Sorting"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="5"
                viewBox="0 0 6 4"
              >
                <path
                  id="Path_1041"
                  data-name="Path 1041"
                  d="M11,3H5L8,7Z"
                  transform="translate(-5 -3)"
                  fill="#6B6B6B"
                />
              </svg>
            </div>
          </React.Fragment>
        );
      },
      style: {
        width: "150px",
        color: "#1D1D1D",
      },
    },
    {
      Header: "Delete",
      accessor: (d) => {
        return (
          <div className="btn-outline-primary-icon btn-sm">
            <svg
              onClick={() => alert(d.name)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </div>
        );
      },
      style: {
        width: "100px",
        textAlign: "center",
      },
    },
    {
      Header: "Edit",
      accessor: (d) => {
        return (
          <div className="btn-outline-primary-icon btn-sm">
            <svg
              onClick={() => alert(d.email)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </div>
        );
      },
      style: {
        width: "100px",
        textAlign: "center",
      },
    },
    {
      Header: "Info",
      accessor: (d) => {
        return (
          <div className="btn-outline-primary-icon btn-sm">
            <svg
              onClick={() => alert(d.body)}
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              className="bi bi-eye"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
              />
              <path
                fillRule="evenodd"
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
          </div>
        );
      },
      style: {
        width: "100px",
        textAlign: "center",
      },
    },
  ];

  const precedenceObject = {
    id: "precedence",
    Header: "", // If no header required leave empty
    moveUp: (index) => {
      return (
        <div className="btn-outline-primary-icon btn-sm">
          <svg
            onClick={() => {
              if (index) ref.current.moveRows(index, index - 1);
            }}
            //style={{  }}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-circle-up"
            width="16px"
            height="16px"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-arrow-circle-up fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"
            ></path>
          </svg>
        </div>
      );
    },
    moveDown: (index) => {
      return (
        <div className="btn-outline-primary-icon btn-sm">
          <svg
            onClick={() => {
              ref.current.moveRows(index, index + 1);
            }}
            //style={{ cursor: "pointer" }}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-circle-down"
            className="svg-inline--fa fa-arrow-circle-down fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-143.6-28.9L288 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L239 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z"
            ></path>
          </svg>
        </div>
      );
    },
    showMoveTo: true,
    moveTo: (index) => {
      return (
        <div
          onClick={() => {
            // use this callback to get clicked index and to call custom popup for swap and jumpTo features
            console.log(index);
          }}
          className="hyperlink"
        >
          Move To
        </div>
      );
    },
    style: {
      width: "250px",
    },
  };

  const fetchList = async (pageSize, pageIndex, filterText) => {
    console.log(
      `fetchList: pageSize = ${pageSize} , pageIndex = ${pageIndex}, filterText = ${filterText}`
    );
    const resp = await getList(pageIndex);
    //console.log("response :", resp);
    const startRow = pageSize * pageIndex;
    const endRow = startRow + pageSize;
    console.log(resp.slice(startRow, endRow));
    return {
      data: resp.slice(startRow, endRow),
      totalRecords: resp.length || 0,
      isNextPage: resp.isNextPage,
      pageNumber: resp.pageNumber,
    };
  };

  const ShowMoreComponent = () => {
    return <button className="btn btn-app-primary">{`Show More`}</button>;
  };

  const ExportComponent = () => {
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
    return (
      <div className="dropdown">
        <button
          className="btn-micro btn-app-secondary btn-export"
          type="button"
          id="dropdownMenuButton"
          onClick={(e) => {
            e.preventDefault();
            setPopoverOpen(!isOpen);
          }}
        >
          <div>Export</div>
          <div className="column-hide-svg btn-icon-color">
            <svg
              id="Sorting"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="5"
              viewBox="0 0 6 4"
            >
              <path
                id="Path_1041"
                data-name="Path 1041"
                d="M11,3H5L8,7Z"
                transform="translate(-5 -3)"
                fill="#6B6B6B"
              />
            </svg>
          </div>
        </button>
        {isOpen ? (
          <div className={menuClass} aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item">CSV</div>
            <div className="dropdown-item">Excel</div>
            <div className="dropdown-item">PDF</div>
          </div>
        ) : null}
      </div>
    );
  };

  const formFields = {
    title: "Anything",
    elements: [
      {
        name: "Label",
        label: "label",
        type: "text",
        autoComplete: true,
        props: {
          required: false,
        },
        width: {
          md: 3,
        },
        placeholder: "Input dependent field",
      },
      {
        name: "Dropdown",
        label: "dropdown",
        type: "select",
        props: {
          required: false,
        },
        width: {
          md: 3,
        },
        getData: async () => {
          return await fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              return responseData.map((resp, index) => {
                return {
                  value: resp.id,
                  label: resp.name,
                };
              });
            });
        },
      },
      {
        name: "Dropdown",
        label: "dropdown",
        type: "select",
        props: {
          required: false,
        },
        width: {
          md: 3,
        },
        getData: async () => {
          return await fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              return responseData.map((resp, index) => {
                return {
                  value: resp.id,
                  label: resp.name,
                };
              });
            });
        },
      },
      {
        name: "date",
        label: "Date",
        type: "date",
        props: {
          required: false,
          disabled: false,
          isTimeRequired: false,
        },
        width: {
          md: 3,
        },
        default: "",
        placeholder: "Date input",
      },
    ],
  };

  const FilterComponent = () => {
    const onClickFilterFunc = () => {
      showFilterFormData(true);
    };

    return (
      <React.Fragment>
        <div className="popover-btn-wrapper">
          <span data-tip={true} data-for={"filter"}>
            <button className="btn btn-outline-primary btn-sm" type="button">
              <div
                className="column-hide-svg btn-icon-color"
                onClick={onClickFilterFunc}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  class="bi bi-funnel"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
                  />
                </svg>
              </div>
            </button>
            <ReactTooltip
              effect="solid"
              delayHide={100}
              delayShow={300}
              className="custom-tooltip-wrapper"
              place={"top"}
              id={"filter"}
            >
              {"Advanced Filter"}
            </ReactTooltip>
          </span>
        </div>
      </React.Fragment>
    );
  };

  const handleSearch = () => {
    console.log("Clicked search");
  };

  const FilterComponentChild = forwardRef((props, ref) => {
    const handleCancel = () => {
      console.log("Cancel clicked");
      showFilterFormData(false);
    };

    return (
      <div
        className="col-md-12"
        style={{
          background: "#FFFFFF",
          border: "1px solid #DCDCDC",
          borderRadius: "3px",
          top: "10px",
          marginBottom: "30px",
          padding: "20px",
        }}
      >
        {/*Dynamic form can be used to show on click of filter button */}
        {/* <DynamicForm fields={formFields} ref={ref} /> */}
        <div className="row ">
          <div className="col-md-8 col-lg-8">
            <div>Filter form</div>
          </div>
          <div
            className="col-md-4 col-lg-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              className="btn btn-app-tertiary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-app-primary"
              type="button"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  });

  const OnShowActionComponent = () => {
    return (
      <>
        <div className="Action-wrapper">
          <div>
            <span className="selection-text"> What would you like to do? </span>
            <button
              className="btn btn-app-secondary"
              style={{
                height: "30px",
                lineHeight: "30px",
                border: "solid 1px",
                marginLeft: "10px",
                padding: "0px 12px",
                marginRight: "0px",
                fontSize: "12px",
              }}
              type="button"
              onClick={() => {
                ref.current.resetSelectedRows();
              }}
            >
              Action button
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderSubComponent = (data) => {
    return <SubComponent rowData={data} />;
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <AppTable
            ref={ref}
            title="Demo table"
            columns={columns}
            getDataFrom={fetchList}
            limit={5}
            hide={2}
            actionheader={["Delete", "Edit", "Info", "add"]}
            popOverId={"PopoverFocus1"}
            loaderProps={{ loaderTextColor: "#000000" }}
            langChangedValues={{
              searchField: "What are you looking for?",
              perPageCount: "Per View",
              pagination: "Pagenumber",
              paginationOf: "of",
              firstPage: "F",
              prevPage: "P",
              nextPageState: "N",
              lastPage: "L",
              noDataAvailableTag: "Hey, looks like there is no data to show!!!",
              expanderText: "expanderr",
              selectionText: "selectionn",
              actionHeader: "Action",
              loaderText: "Loading...",
              quickSearchTooltip: "Quick Search",
              refreshTableTooltip: "Refresh Table",
              hideColumnTooltip: "Hide Columns",
            }}
            isExportActionEnabled={true}
            exportComponent={<ExportComponent />}
            //imageSrcFiles={{ sortImageDsc: "/sort_descending.svg", sortImageAsc: "/sort_ascending.svg", sortImageDef: "/sort_default.svg" }}
            isSearchFilterEnabled={true}
            isRefreshEnabled={true}
            isFilterActionEnabled={true}
            recordsPerPageList={[5, 10, 25, 50]}
            formFields={formFields}
            filterComponent={<FilterComponent />}
            isGUIenabled={true}
            addItem={
              <button
                className="btn btn-primary"
                // style={{
                //   height: "30px",
                //   lineHeight: "30px",
                //   border: "solid 1px",
                //   padding: "0px 12px",
                // }}
                type="button"
              >
                Add Item
              </button>
            }
            enableRowDragnDrop={false}
            isPaginationEnabled={true}
            isWithoutPageCount={false}
            isShowMoreEnabled={false}
            showMoreComponent={<ShowMoreComponent />}
            isPrecedenceEnabled={true}
            precedenceObject={precedenceObject}
            filterComponentChild={<FilterComponentChild />}
            filterFormData={filterFormData}
            selectionKey="id"
            enableRowSelection={true}
            onRowSelectedActionComponent={<OnShowActionComponent />}
            enableSubComponent={true}
            subComponent={renderSubComponent}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const SubComponent = ({ rowData }) => {
  return (
    <div
      className="bg-light"
      style={{
        marginLeft: "-20px",
        marginRight: "-20px",
        padding: "10px 20px",
      }}
    >
      <div className="row">
        <div className="col-1">
          <dt>{`Post ID`}</dt>
          <dd className="text-wrap">{rowData["postId"]}</dd>
        </div>
        <div className="col-2">
          <dt>{`Name`}</dt>
          <dd className="text-wrap">{rowData["name"]}</dd>
        </div>
        <div className="col-2">
          <dt>{`Email`}</dt>
          <dd className="text-wrap">{rowData["email"]}</dd>
        </div>
        <div className="col-5">
          <dt>{`Description`}</dt>
          <dd className="text-wrap">{rowData["body"]}</dd>
        </div>
        <div className="col-2 text-right">
          <button
            className="btn btn-primary"
            onClick={() => alert(rowData.body)}
          >
            Click
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoTable;
