"use server";

import { revalidatePath } from "next/cache";

// export async function updateBlog() {}

export async function createBlog(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      date: formData.get("date") as string,
    };

    console.log(data);
    const reponse = await fetch(
      "https://677e3ae094bde1c1252affe2.mockapi.io/blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await reponse.json();
    console.log(responseData);
    revalidatePath('/manage')
    return responseData;

  } catch (error) {
    console.log(error);
  }
}

export async function updateBlog(
    prevState: {
      message: string;
    },
    formData: FormData
  ) {
    try {
      const data = {
        id:formData.get("id") as string,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        date: formData.get("date") as string,
      };

      console.log(data);
      const reponse = await fetch(
        `https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await reponse.json();
      console.log(responseData);
      revalidatePath('/manage')
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }


export async function deleteBlog(prevState: {
  message: string;
},formData: FormData) {
try{
  const data = {
    id:formData.get("id") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    date: formData.get("date") as string,
  };

  const response = await fetch(`https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${data.id}`,
  {
    method:"DELETE",
    headers:{
      "Content-Type" : "application/json",
    },

  }
  )
  if (!response.ok) {
    throw new Error("Failed to delete the blog post.");
  }
  const responseData = await response.json();
console.log("Deleted blog:", responseData);
revalidatePath('/manage')
return responseData;

}catch (error) {
console.error(error);
 }


}
