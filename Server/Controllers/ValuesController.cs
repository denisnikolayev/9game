using System.Collections.Generic;
using Game.Server.Model.Players;
using Microsoft.AspNet.Mvc;
using MongoDB.Driver;

namespace Game.Server.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly IMongoCollection<User> _users;

        public ValuesController(IMongoCollection<User> users)
        {
            _users = users;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _users.Find(f=>true).ToList();
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
