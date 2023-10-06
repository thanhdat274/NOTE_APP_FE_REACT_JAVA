import { connect } from './connect';

export const listFolder = (useData: any) => {
  console.log("userData: " + useData)
  const url = `/folders/${useData?.user?.id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${useData?.token}`,
    },
  });
};

export const createFolder = (data: any) => {
  const url = `/folders/${data?.useData?.user?.id}`;
  return connect.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const removeFolders = (data: any) => {
  const url = `/folders/${data?.id}`;
  return connect.delete(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const foldersDetail = (data: any) => {
  const url = `/folders/detail/${data?.id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const updateFolders = (data: any) => {
  const url = `/folders/${data?.id}`;
  return connect.put(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};
