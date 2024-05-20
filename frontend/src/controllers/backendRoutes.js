const base = process.env.REACT_APP_BASE;

export const loginUser = async(obj) => {
    const res = await fetch(`${base}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const createUser = async(obj) => {
    const res = await fetch(`${base}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const updateUser = async(obj,id) => {
    console.log("going to update",id,obj)
    const res = await fetch(`${base}/api/user/updateuser/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });
    const ans = await res.json();
    console.log("resp",ans)
    return ans;
}

export const getUserDetails = async(id) => {
    const res = await fetch(`${base}/api/user/getUserDetails/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const uploadProfilePic = async (id, formData) => {
     try {
        console.log("here is form data",formData)
        const response = await fetch(`${base}/api/user/imageUpload/${id}`, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log("uploadProfilePic msg", data.message); 
          return data;
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error(error);
      }
}

export const saveProperty = async (id, formData) => {
    console.log("here is form data",formData)
    // const data= JSON.stringify(formData);
     try {
        const response = await fetch(`${base}/api/user/saveProperty/${id}`, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
        //   console.log(data.message); // File uploaded successfully
          return data;
        } else {
          console.error('Failed to save and upload file');
        }
      } catch (error) {
        console.error(error);
      }
}

export const getListedRooms = async(id) => {
    const res = await fetch(`${base}/api/user/getListedRooms/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const getProperties = async() => {
    const res = await fetch(`${base}/api/user/getProperties`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const sendEmails = async(id, obj) => {
    const res = await fetch(`${base}/api/user/sendEmails/${id}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const deleteRoom = async(id) => {
    const res = await fetch(`${base}/api/user/deleteRoom/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const updateRoom = async(id,data) => {
    const res = await fetch(`${base}/api/user/updateRoom/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const ans = await res.json();
    console.log("resp",ans)
    return ans;
}

export const updateRoomWithImage = async (id, formData) => {
    console.log("updateRoomWithImage",formData)
    // const data= JSON.stringify(formData);
     try {
        const res = await fetch(`${base}/api/user/updateRoomWithImage/${id}`, {
          method: 'PATCH',
          body: formData
        });

        const ans = await res.json();
        return ans;
      } catch (error) {
        console.log(error);
      }
}