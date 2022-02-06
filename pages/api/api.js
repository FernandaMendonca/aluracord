// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const getUser = async (user) => {
  return await fetch(`https://api.github.com/users/${user}`, {
    method: 'GET'
  }).then(async (res) => {
    if (res.ok) {
      data = await data.json();
      return data;
    }
  })
    .catch(function (error) {
      console.error(error);
    });
}

export default getUser;