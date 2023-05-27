FROM python:3.9.0
WORKDIR /srv
RUN pip install --upgrade --force-reinstall pip 
RUN pip install flask
RUN pip install -I scikit-learn
RUN pip install psycopg2

COPY . /srv
ENV FLASK_APP=model
CMD ["python","model.py"]