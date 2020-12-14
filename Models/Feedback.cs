using System;

namespace retrospect.Models
{
    public enum TypeEmun { WorkedWell, NeedsImprovement, ActionItems }

    public class Feedback
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Votes { get; set; }
        public TypeEmun Type { get; set; }
    }
}