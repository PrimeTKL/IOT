import cv2
import mediapipe as mp
import requests
import threading
import time
from threading import Event
exit = Event()

UBIDOTS_API_KEY = "BBUS-KWqmaDCdB4GOjxomHUubHFegcYDpEx"
UBIDOTS_DEVICE_ID = "65866317532381000e67248f"
UBIDOTS_VARIABLE_ID = "65866317532381000e672490"


def process_ubidots_data():
    global red_led, green_led, fan, str, check,temp

    for i in range(5):
        # Lấy dữ liệu từ Ubidots
        a = int(get_ubidots_data())
        
        # Chuyển đổi thành chuỗi nhị phân
        str_value = decimal_to_binary(a)
        
        # Lưu trữ giá trị cũ
        temp = str_value

        # Gán giá trị cho các biến global
        red_led = str_value[7]
        green_led = str_value[9]
        fan = str_value[5]
        check = 0

        # Tạo độ trễ hoặc thực hiện các xử lý khác nếu cần
        time.sleep(0.1)

# Hàm để lấy dữ liệu từ Ubidots
def get_ubidots_data():
    url = f"https://industrial.api.ubidots.com/api/v2.0/devices/{UBIDOTS_DEVICE_ID}/variables/{UBIDOTS_VARIABLE_ID}/"
    headers = {"X-Auth-Token": UBIDOTS_API_KEY}
    
    response = requests.get(url, headers=headers)
    data = response.json()
    return(data['lastValue']['value'])



def send_data(value_to_send):
    url = f"https://industrial.api.ubidots.com/api/v1.6/variables/{UBIDOTS_VARIABLE_ID}/values"
    headers = {"X-Auth-Token": UBIDOTS_API_KEY, "Content-Type": "application/json"}
    
    response = requests.post(url, headers=headers, json={"value" : value_to_send})
    
    if response.status_code == 201:
        print("Dữ liệu đã được gửi thành công.")
    else:
        print(f"Lỗi khi gửi dữ liệu lên Ubidots. Mã trạng thái: {response.status_code}")

    # Tạo một luồng mới và chạy hàm send_data trong luồng đó
    # thread = threading.Thread(target=send_data)
    # thread.start()
    # while not exit.is_set():
    #   thread2 = threading.Thread(target=send_data)
    #   thread2.start()
    #   exit.wait(0.5)
    # while not exit.is_set():
    #   thread3 = threading.Thread(target=send_data)
    #   thread3.start()
    #   exit.wait(0.5)
    # thread2 = threading.Thread(target=send_data)
    # thread2.start()
    # time.sleep(0.5)
    # thread3 = threading.Thread(target=send_data)
    # thread3.start()
    # time.sleep(0.5)
    # thread4 = threading.Thread(target=send_data)
    # thread4.start()
    # time.sleep(0.5)
    # thread5 = threading.Thread(target=send_data)
    # thread5.start()


def decimal_to_binary(decimal_number):
    binary_number = bin(decimal_number)[2:]  # Bỏ qua ký tự '0b' ở đầu
    binary_number = binary_number.rjust(10, '0')
    return binary_number

def binary_to_decimal(binary_number):
    decimal_number = int(binary_number, 2)
    return decimal_number


# Khởi tạo đối tượng Mediapipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Mở camera
cap = cv2.VideoCapture(0)

a = int(get_ubidots_data())
str = decimal_to_binary(a)
red_led = str[7]
green_led = str[9]
fan = str[5]
check = 0
temp = ''
while cap.isOpened():

    ret, frame = cap.read()

    # Đảo ngược hình ảnh để hiển thị đúng hướng
    frame = cv2.flip(frame, 1)

    # Chuyển đổi màu hình ảnh từ BGR sang RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Nhận diện bàn tay
    results = hands.process(rgb_frame)

    # Vẽ các landmarks và đường trên bàn tay
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            # Lấy vị trí các ngón tay
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP] # Đầu ngón trỏ
            index_pip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP] # Đít ngón trỏ

            pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP] # Đầu ngón út
            pinky_pip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP] # Đít ngón út

            middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]  # Đầu ngón giữa
            middle_pip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP]  # Đít ngón giữa

            ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]  # Đầu ngón áp út
            ring_pip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP]  # Đít ngón áp út


            # Phân loại hình ảnh dựa trên vị trí của ngón tay
            # Nếu ngón tay trỏ cao, đó có thể là biểu hiện của "KÉO" hoặc "BAO"
            if index_tip.y < index_pip.y :
                # Nếu ngón út cao, có thể là "BAO"
                if pinky_tip.y < pinky_pip.y:
                    print("Giấy")
                    if red_led == '0':
                        red_led = '1'
                        check = 1
                # Nếu không thì là "Kéo" hoặc "Dùi"
                else:
                    if middle_tip.y < middle_pip.y:
                        print("Kéo")
                        if fan == '0':
                            fan = '1'
                            check = 1
                    else:
                        print("Dùi")
                        if green_led == '0':
                            green_led = '1'
                            check = 1
            # Ngược lại, có thể là biểu hiện của "BÚA"
            else:
                print("Búa")
                if red_led == '1' or green_led == '1' or fan == '1':
                    red_led = '0'
                    green_led = '0'
                    fan = '0'
                    check = 1

    

    if check:
        
        str = str[:5] + fan + str[6] + red_led + str[8] + green_led
        data = binary_to_decimal(str)
        
        send_data(data)
        send_data(data)
        send_data(data)
        process_ubidots_data()
        print(a)
        print(temp)
        print(data)
        print(str)

    # Hiển thị hình ảnh với landmarks và kết quả phân loại
    cv2.imshow('Hand Tracking', frame)

    # Nhấn 'q' để thoát
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Giải phóng tài nguyên
hands.close()
cap.release()
cv2.destroyAllWindows()
