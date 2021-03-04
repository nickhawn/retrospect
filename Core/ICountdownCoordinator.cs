using System;

namespace Core
{
    public interface ICountdownCoordinator
    {
        DateTime GetNextIteration();
    }
}