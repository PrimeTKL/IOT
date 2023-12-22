#include "Ubidots.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>
#include <pt.h>
#include <String.h>
#include <math.h>
#include <protothreads.h>
// Khai báo cấu trúc cho luồng
static struct pt pt1, pt2, pt3;

const char* UBIDOTS_TOKEN = "BBUS-1cgggIUhARAaKmNebzojrctnjyp1wY";
const char* WIFI_SSID = "XIAOMI";
const char* WIFI_PASS = "1234567890";
const char* DEVICE_LABEL = "5ccf7f18b867";
const char* LED_VARIABLE_LABEL = "6559bd05644046000c27a201";
const char* AUTO_LED_CONTROL_LABEL = "655a4c4d79b8d4000e7ac01a";
const char* LED_HOME = "655a556db4c4c507205c29f0";
const char* AUTO_LED_HOME = "655a563f53acf00557d15f1e";
const char* STR = "655a809979b8d4000d88b743";
const char* DHT11_VARIABLE_LABEL = "6559c4c4c500516cfa256589";


Ubidots ubidots(UBIDOTS_TOKEN, UBI_TCP);

const int LIGHT_SENSOR_PIN = A0;
const int SOUND_SENSOR_PIN = D1;
const int LED_PIN = D4;
const int LED_PIN_HOME = D3;
const int LED_PIN_FAN = D2;
const int DHTPIN = D5;  // Pin where the DHT11 is connected
const int DHTTYPE = DHT11;
// const int ALARM_PIN = D0;
DHT dht(DHTPIN, DHTTYPE);

int led_out = 0, led_home = 0, auto_out = 0, auto_home = 0, temperature = 0, fan = 0, auto_fan = 0;

void get_LedControl_Data_From_Ubidots() {

  if (auto_out == 0) {
    if (led_out == 1) {
      digitalWrite(LED_PIN, HIGH);  // Bật den nếu giá trị từ Ubidots là 1
    } else if (led_out == 0) {
      digitalWrite(LED_PIN, LOW);  // Tắt den nếu giá trị từ Ubidots là 0
    }
  } else {
    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    if (lightValue > 700) {
      digitalWrite(LED_PIN, HIGH);
      led_out = 1;
    } else {
      digitalWrite(LED_PIN, LOW);
      led_out = 0;
    }
  }
}


void get_Led_Home_Data_From_Ubidots() {

  if (auto_home == 0) {
    if (led_home == 1) {
      digitalWrite(LED_PIN_HOME, HIGH);  // Bật den nếu giá trị từ Ubidots là 1
    } else if (led_home == 0) {
      digitalWrite(LED_PIN_HOME, LOW);  // Tắt den nếu giá trị từ Ubidots là 0
    }
  } else {
    int soundValue = analogRead(SOUND_SENSOR_PIN);
    if (soundValue > 700) {
      led_home = (led_home + 1) % 2;
    }
    if (led_home){
      digitalWrite(LED_PIN_HOME, HIGH);
    } else {
      digitalWrite(LED_PIN_HOME, LOW);
    }
  }
}

void get_Fan_Data_From_Ubidots() {
  temperature = (int)(dht.readTemperature());
  if (auto_fan == 0) {
    if (fan == 1) {
      digitalWrite(LED_PIN_FAN, HIGH);  // Bật den nếu giá trị từ Ubidots là 1
    } else if (fan == 0) {
      digitalWrite(LED_PIN_FAN, LOW);  // Tắt den nếu giá trị từ Ubidots là 0
    }
  } else {
    Serial.print("temperature: ");
    Serial.println(temperature);
    if (temperature > 32) {
      digitalWrite(LED_PIN_FAN, HIGH);
      fan = 1;
    } else {
      digitalWrite(LED_PIN_FAN, LOW);
      fan = 0;
    }
  }
}


void setup() {
  // pinMode(ALARM_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN_HOME, OUTPUT);
  pinMode(LED_PIN_FAN, OUTPUT);
  

  Serial.begin(115200);
  dht.begin();
  ubidots.wifiConnect(WIFI_SSID, WIFI_PASS);
  ubidots.add(STR, 100000000);
  ubidots.send();
}




void loop() {
  long decimalNumber = ubidots.get(DEVICE_LABEL,STR);
  Serial.print("\nTrước: ");
  Serial.println(decimalNumber);

  int binaryArray[32] = {0};
    
  // Số bit của số nguyên trong hệ nhị phân
  int bitCount = 0;
  
  // Chuyển đổi số nguyên thành dạng nhị phân
  while (decimalNumber > 0) {
      binaryArray[bitCount] = decimalNumber % 2;
      decimalNumber = decimalNumber / 2;
      bitCount++;
  }
  for (int i=0; i<32; i++){
    Serial.print(binaryArray[i]);
  }
  
  // long temp = str;
  led_out = binaryArray[0];
  auto_out = binaryArray[1];
  led_home = binaryArray[2];
  auto_home = binaryArray[3];
  fan = binaryArray[4];
  auto_fan = binaryArray[5];
  // temperature = binaryArray[6] + binaryArray[7] * 10;
  // Đọc giá trị từ cảm biến ánh sáng
  get_Led_Home_Data_From_Ubidots();
  get_LedControl_Data_From_Ubidots();
  get_Fan_Data_From_Ubidots();

  int binaryNumber[6] = {0};
  binaryNumber[0] = auto_fan;
  binaryNumber[1] = fan;
  binaryNumber[2] = auto_home;
  binaryNumber[3] = led_home;
  binaryNumber[4] = auto_out;
  binaryNumber[5] = led_out;
  Serial.print("\nSau: ");
  Serial.println(binaryNumber[5]);
  for (int i=0; i<6; i++){
    Serial.print(binaryNumber[i]);
  }
  decimalNumber = 0;

  for (int i = 0; i < 6; i++) {
      if (binaryNumber[i] == 1) {
          decimalNumber += 1 << (5 - i);
      }
  }
  // if (str != temp) {
    ubidots.add(STR, decimalNumber);
    ubidots.add(DHT11_VARIABLE_LABEL, temperature);
    ubidots.send();
  // }

}
