#include <iostream>
#include <fstream>

using namespace std;

int main() {
  fstream fs("pathData", fstream::in);
  fstream fsPeople("pathPeople.txt", fstream::out);
  fstream fsCar("pathCar.txt", fstream::out);  
  int from, to, length, isCar;
  while(fs >> from >> to >> length >> isCar) {
    fsPeople 
      << "new Edge(" << from << ", " << to << ", " << length << ")," << endl
      << "new Edge(" << to << ", " << from << ", " << length << ")," << endl;
      if(isCar == 1) {
        fsCar 
          << "new Edge(" << from << ", " << to << ", " << length << ")," << endl
          << "new Edge(" << to << ", " << from << ", " << length << ")," << endl;
      }
  }
}