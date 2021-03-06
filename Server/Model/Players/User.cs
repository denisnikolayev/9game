﻿using System;
using Newtonsoft.Json;

namespace Game.Server.Model.Players
{
    public class User 
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("avatarUrl")]
        public string AvatarUrl { get; set; }

        [JsonProperty("money")]
        public int Money { get; set; }
        

        [JsonProperty("isHuman")]
        public bool IsHuman { get; set; }


        public override int GetHashCode() => this.Id.GetHashCode();       
        public override bool Equals(object other) =>  this?.Id == (other as User)?.Id;
        public static bool operator ==(User a, User b) => Object.ReferenceEquals(a, b) || a?.Equals(b) == true;
        public static bool operator !=(User a, User b) => !(a == b);
    }
}
