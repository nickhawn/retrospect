using System;
using System.Collections.Generic;

namespace Core
{
    public class CountdownCoordinator : ICountdownCoordinator
    {
        private readonly List<int> _times = new List<int> { 5, 4, 3, 2, 1 };
        private DateTime _currentIteration;
        private int _currentIterationIndex = 0;

        public DateTime GetNextIteration()
        {
            var date = DateTime.Now.AddMinutes(_times[_currentIterationIndex]);
            _currentIteration = date;
            DetermineNextIteration();

            return date;
        }

        private void DetermineNextIteration()
        {
            if (_currentIterationIndex != _times.Count - 1)
                _currentIterationIndex++;
            else
                ResetTimeAndGetNextIteration();
        }

        private void ResetTimeAndGetNextIteration() => _currentIterationIndex = 0;
    }
}
