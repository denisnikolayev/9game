using System.Collections.Generic;
using Microsoft.AspNet.Mvc;

namespace Game.Server.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<int> Get()
        {
            return new int[] {1, 3, 8, 10};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public int Get(int id)
        {
            return id + id;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
